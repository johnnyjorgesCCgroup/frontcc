module.exports = {
    apps: [
      {
        name: 'vite-dev-server',
        script: 'node_modules/vite/bin/vite.js',
        args: 'serve',
        instances: 1,
        exec_mode: 'fork',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'development'
        }
      }
    ]
  };
  