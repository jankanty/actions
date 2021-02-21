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
          console.log(data.toString());

          email += data.toString();
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
          console.log(data.toString());

          name += data.toString();
        }
      }
    }
  );

  console.log(`${ name } <${ email }>`);
}



run();