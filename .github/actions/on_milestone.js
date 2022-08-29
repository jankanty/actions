const { execSync } = require('child_process');

const MILESTONE = 'v0.163.x';

const getPullRequests = async () => {
  const buffer = await execSync(`gh pr list --json milestone,title --search "is:closed milestone:${MILESTONE}"`);

  return JSON.parse(buffer.toString());
};

const getTickets = async (pullRequests) => {
  return pullRequests
    .reduce((array, { title }) => {
      array.push(...title.match(/(AST-[0-9]+)/g));

      return array;
    }, [])
    .filter((element, index, array) => {
      return array.indexOf(element) === index;
    })
    .sort();
};

const updateMilestone = async (pullRequests, tickets) => {
  const milestone = pullRequests[0].milestone;

  const url = encodeURI(`https://vizlib.atlassian.net/issues/?jql=key in (${tickets.join(',')})`);

  const description = milestone.description.replace(/\[JIRA tickets\]\(.+\)/g, '').trim();

  await execSync(`gh milestone edit ${milestone.number} --description "${`[JIRA tickets](${url})\n\n${description}`.trim()}"`);
};

const run = async () => {
  await execSync('gh extension install valeriobelli/gh-milestone');

  const pullRequests = await getPullRequests();
  const tickets = await getTickets(pullRequests);

  await updateMilestone(pullRequests, tickets);
};

run();
