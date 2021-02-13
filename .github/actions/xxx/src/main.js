const core = require('@actions/core');
const github = require('@actions/github');



try {
  console.log('Hello there');
}

catch (error) {
  core.setFailed(error.message);
}