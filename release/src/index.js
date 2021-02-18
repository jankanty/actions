const {exec} = require('@actions/exec');



async function run() {
  await exec('echo Running release action...')
}



run();