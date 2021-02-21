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

  email = email.replace(/.{5}$/, '');
  name = name.replace(/.{5}$/, '');

  console.log(`${ name } <${ email }>`);
}



run();