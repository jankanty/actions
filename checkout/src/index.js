const {exec} = require('@actions/exec');



async function run() {
  await exec('echo Running checkout action...')

  const email = await exec('git log -1 --format=\'%ae\'');
  const name = await exec('git log -1 --format=\'%ae\'');

  console.log(`${ name } <${ email }>`);
}



run();