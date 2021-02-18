const {exec} = require('@actions/exec');



async function run() {
  await exec('echo Running checkout action...')
}



run();