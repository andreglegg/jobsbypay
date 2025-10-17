import { useEffect, useState } from 'react';

import Intro from './Intro/Intro';
import Jobs from './Jobs/Jobs';
import JobsLoading from './Jobs/Job/JobLoading';
import type { JobListing, JobsResponse } from '../types/jobs';

type RequestStatus = 'idle' | 'loading' | 'ready' | 'error';

const DEFAULT_JOBS_ENDPOINT = 'output.json';
const configuredEndpoint = import.meta.env.VITE_JOBS_ENDPOINT?.trim();
const JOBS_ENDPOINT = configuredEndpoint && configuredEndpoint.length > 0 ? configuredEndpoint : DEFAULT_JOBS_ENDPOINT;

const Home = () => {
  const [jobsData, setJobsData] = useState<JobListing[]>([]);
  const [status, setStatus] = useState<RequestStatus>('idle');

  useEffect(() => {
    const controller = new AbortController();

    const loadJobs = async () => {
      setStatus('loading');
      const endpoints = JOBS_ENDPOINT === DEFAULT_JOBS_ENDPOINT ? [JOBS_ENDPOINT] : [JOBS_ENDPOINT, DEFAULT_JOBS_ENDPOINT];
      const baseUrl = new URL(import.meta.env.BASE_URL ?? '/', window.location.origin);

      for (const endpoint of endpoints) {
        try {
          const resolvedEndpoint = (() => {
            if (/^https?:\/\//i.test(endpoint)) {
              return endpoint;
            }

            if (endpoint.startsWith('/')) {
              return new URL(endpoint, window.location.origin).toString();
            }

            return new URL(endpoint, baseUrl).toString();
          })();
          const response = await fetch(resolvedEndpoint, { signal: controller.signal });
          if (!response.ok) {
            throw new Error(`Failed to fetch job listings (${response.status})`);
          }
          const payload = (await response.json()) as JobsResponse;
          setJobsData(Array.isArray(payload.jobs) ? payload.jobs : []);
          setStatus('ready');
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            return;
          }
          if ((error as Error).name === 'AbortError') {
            return;
          }
          console.warn(`Job feed attempt failed for ${endpoint}`, error);
        }
      }

      setStatus('error');
    };

    loadJobs();

    return () => controller.abort();
  }, []);

  if (status === 'loading' || status === 'idle') {
    return (
      <>
        <Intro />
        <JobsLoading />
      </>
    );
  }

  if (status === 'error') {
    return (
      <>
        <Intro />
        <p role="alert">We could not reach the job feed right now. Please refresh and try again later.</p>
      </>
    );
  }

  return (
    <>
      <Intro />
      <Jobs jobsData={jobsData} />
    </>
  );
};

export default Home;
