import enforceEnv from 'envil';

const envs = () => {
  const envVariables = [
    'PORT',
    'DB_URI',
    'DB_NAME',
    'RPC_URI',
    'NODE_ENV',
    'LOG_FILE_PATH',
    'GATEWAY_CONTRACT',
    'ADMIN_SECRET_KEY',
    'CRYPTO_COMPARE_API',
  ];

  return enforceEnv(envVariables, { returnValues: true });
};
export default envs;
