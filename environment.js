import Constants from 'expo-constants';

const ENV = {
    dev: {
        endpoint: 'https://5615-175-137-223-211.ap.ngrok.io/api'
    },
    staging: {
        endpoint: 'https://5615-175-137-223-211.ap.ngrok.io/api'
    },
    prod: {
        endpoint: 'https://5615-175-137-223-211.ap.ngrok.io/api'
    }
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (env === null || env === undefined || env === "" || env.indexOf("dev") !== -1) return ENV.dev;
    if (env.indexOf("staging") !== -1) return ENV.staging;
    if (env.indexOf("prod") !== -1) return ENV.prod;
}

export const { endpoint } =  getEnvVars();

const BUCKET = {
    dev: {
        bucket: ''
    },
    staging: {
        bucket: ''
    },
    prod: {
        bucket: ''
    }
}

const getBucketVars = (env = Constants.manifest.releaseChannel) => {
    if (env === null || env === undefined || env === "" || env.indexOf("dev") !== -1) return BUCKET.dev;
    if (env.indexOf("staging") !== -1) return BUCKET.staging;
    if (env.indexOf("prod") !== -1) return BUCKET.prod;
}

export const { bucket } =  getBucketVars();