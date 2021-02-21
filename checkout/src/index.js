const {exec} = require('@actions/exec');



async function run() {
  await exec('echo Running checkout action...')

  let email = '';
  let name = '';

  await exec(
    'git log -1 --format=\'%ae\'',
    [],
    {
      stdout: (data) => {
        email += data.toString();
      }
    }
  );

  await exec(
    'git log -1 --format=\'%an\'',
    [],
    {
      stdout: (data) => {
        name += data.toString();
      }
    }
  );

  console.log(`${ name } <${ email }>`);
}



run();