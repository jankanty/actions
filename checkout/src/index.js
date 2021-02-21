const {exec} = require('@actions/exec');



async function run() {
  await exec('echo Running checkout action...')

  let email = '';
  let name = '';

  await exec(
    'git log -1 --format=\'%ae\'',
    [],
    {
      listeners: {
        stdout: (data) => {
          const string = data.toString();

          if (string !== '\n') {
            email += string;
          }
        }
      }
    }
  );

  await exec(
    'git log -1 --format=\'%an\'',
    [],
    {
      listeners: {
        stdout: (data) => {
          const string = data.toString();

          if (string !== '\n') {
            name += string;
          }
        }
      }
    }
  );

  console.log(`${ name } <${ email }>`);
}



run();