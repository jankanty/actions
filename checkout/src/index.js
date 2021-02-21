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
          name += data.toString();
        }
      }
    }
  );

  email = email.replace('\n', '');
  name = name.replace('\n', '');

  console.log(`${ name } <${ email }>`);
}



run();