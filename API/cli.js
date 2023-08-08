const { Command } = require('commander');
const { exec } = require('child_process');

const program = new Command();

program
  .command('app')
  .description('Run app.js')
  .action(() => {
    exec('node app.js', (error, stdout) => {
      if (error) {
        console.error(`Error running app.js: ${error.message}`);
        return;
      }
      console.log(stdout);
    });
  });

program
  .command('pool')
  .description('Run pool.js')
  .action(() => {
    exec('node db/pool.js', (error, stdout) => {
      if (error) {
        console.error(`Error running pool.js: ${error.message}`);
        return;
      }
      console.log(stdout);
    });
  });

program
  .command('fetchAndStore')
  .description('Run fetchAndStore.js')
  .action(() => {
    exec('node db/fetchAndStore.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running fetchAndStore.js: ${error.message}`);
        return;
      }
      console.log(stdout);
    });
  });

  program
  .command('all')
  .description('Run all scripts')
  .action(() => {
    const commandsToRun = [
      'node app.js',
      'node db/pool.js',
      'node db/fetchAndStore.js'
    ];

    commandsToRun.forEach(command => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running ${command}: ${error.message}`);
          return;
        }
        console.log(stdout);
      });
    });
  });

program.parse(process.argv);