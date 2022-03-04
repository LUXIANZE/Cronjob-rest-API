export interface Cronjob {
    jobId: number,
    jobName: string,
    jobStatus: JobStatus,
    jobStartDatetime: Date | null,
    jobEndDatetime: Date | null,
    remarks: string
}

export enum JobStatus {
    QUEUING = 'QUEUING',
    STARTING = 'STARTING',
    RUNNING = 'RUNNING',
    STOPPING = 'STOPPING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
}