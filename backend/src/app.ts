import cors from 'cors';
import express, { static as serveStatic } from 'express';
import { load } from 'cheerio';
import axios from 'axios';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { scheduleJob } from 'node-schedule';

export type JobListing = {
  title: string;
  link: string;
  date: string;
  companyName: string;
  location: string;
  salary: string;
};

const STACK_OVERFLOW_URL =
  'https://stackoverflow.com/jobs?l=Norway&d=20&u=Km&s=1&c=USD&sort=p';
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'output.json');
const PORT = Number.parseInt(process.env.PORT ?? '8080', 10);

const app = express();
app.use(cors());
app.use(serveStatic(path.join(__dirname, '..', 'public')));

const normaliseText = (value = ''): string => value.replace(/\s+/g, ' ').trim();

const scrapeJobs = async (): Promise<JobListing[]> => {
  const { data } = await axios.get<string>(STACK_OVERFLOW_URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    }
  });

  const $ = load(data);
  const jobs: JobListing[] = [];

  $('.-job-summary').each((_, element) => {
    const summary = $(element);
    const title = normaliseText(summary.find('.-title .job-link').text());
    const link = summary.find('.-title .job-link').attr('href');
    const rawDate = normaliseText(summary.find('.-title .-posted-date').text());
    const companyName = normaliseText(summary.find('.-company .-name').text());
    const location = normaliseText(summary.find('.-company .-location').text());
    const salary = normaliseText(summary.find('.-perks .-salary').text());

    if (!title || !link) {
      return;
    }

    if (!salary || salary.toLowerCase() === 'equity') {
      return;
    }

    const formattedLocation = location.replace(/^[-\s]+/, '');
    const formattedSalary = salary.replace(/\s*\|\s*/g, ' | ');
    const formattedDate = rawDate.replace(/ago$/iu, ' ago');

    jobs.push({
      title,
      link,
      date: formattedDate,
      companyName,
      location: formattedLocation,
      salary: formattedSalary
    });
  });

  return jobs;
};

const writeJobFeed = async (jobs: JobListing[]): Promise<void> => {
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      {
        jobs,
        updatedAt: new Date().toISOString()
      },
      null,
      2
    ),
    'utf-8'
  );
};

const readJobFeed = async (): Promise<JobListing[]> => {
  try {
    const content = await fs.readFile(OUTPUT_FILE, 'utf-8');
    const parsed = JSON.parse(content) as { jobs?: JobListing[] };
    return Array.isArray(parsed.jobs) ? parsed.jobs : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('Failed to read existing job feed', error);
    }
    return [];
  }
};

const refreshJobFeed = async (): Promise<JobListing[]> => {
  const jobs = await scrapeJobs();
  await writeJobFeed(jobs);
  return jobs;
};

app.get('/scrape', async (_req, res) => {
  try {
    const jobs = await refreshJobFeed();
    res.json({ jobs });
  } catch (error) {
    console.error('Scrape failed', error);
    const fallbackJobs = await readJobFeed();
    if (fallbackJobs.length > 0) {
      res.json({ jobs: fallbackJobs, stale: true });
      return;
    }
    res.status(500).json({ error: 'Unable to fetch job listings right now.' });
  }
});

scheduleJob('0 */6 * * *', async () => {
  try {
    await refreshJobFeed();
    console.info('Job feed refreshed');
  } catch (error) {
    console.error('Scheduled scrape failed', error);
  }
});

app.listen(PORT, () => {
  console.log(`JobsByPay backend listening on port ${PORT}`);
});

void refreshJobFeed().catch((error) => {
  console.error('Initial scrape failed', error);
});
