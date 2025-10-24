import enforceEnv from 'envil';

const envs = () => {
  const envVariables = [
    'PORT',
    'DB_URI',
    'DB_NAME',
    'NODE_ENV',
    'LOG_FILE_PATH',
  ];

  return enforceEnv(envVariables, { returnValues: true });
};
export default envs;
