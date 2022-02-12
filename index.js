const { program } = require("commander");

const program = new Command();

program
  .requiredOption("-S, source <type>", "source folder for sort")
  .option("-O, --output <type>", "output folder", "./dist");
program.parse(process.argv);
const { source, output } = program.option();

console.log(source, output);
