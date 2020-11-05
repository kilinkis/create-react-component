const program = require('commander');
const fs = require('fs');

const indexFileContent = (name) => {
  return `
  import React from 'react';
  import PropTypes from 'prop-types';
  
  const ${name} = props => {
    return (
      <>
        
      </>
    );
  };
  
  ${name}.propTypes = {
    
  };
  
  export default ${name};
  `;
};

const basicileContent = (name) => {
  return `
  import React from 'react';
  import ${name} from "./index";
  `;
};

program
  .version('0.1.0')
  .arguments('<cmd>')
  .description('test command', {
    cmd: 'command to run',
  })
  .action(function (cmd) {
    // console.log('command:', cmd || 'no Component name given');

    const dir = `./${cmd}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);

      fs.writeFile(`./${cmd}/index.jsx`, indexFileContent(cmd), function (err) {
        if (err) throw err;
        console.log('index.jsx created successfully.');
      });
      fs.writeFile(`./${cmd}/style.scss`, '', function (err) {
        if (err) throw err;
        console.log('index.jsx created successfully.');
      });
      fs.writeFile(
        `./${cmd}/${cmd}.stories.jsx`,
        basicileContent(cmd),
        function (err) {
          if (err) throw err;
          console.log('Stories file created successfully.');
        }
      );
      fs.writeFile(`./${cmd}/${cmd}.spec.js`, basicileContent(cmd), function (
        err
      ) {
        if (err) throw err;
        console.log('Spec file created successfully.');
      });
    } else {
      console.log('Directory already exist');
    }
  });

program.parse(process.argv);
