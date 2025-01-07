const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const projectsDir = path.join(__dirname, "../docs");
const outputFilePath = path.join(
  __dirname,
  "../src/components/HomepageProjects/projectList.js"
);

const projectList = [];

fs.readdirSync(projectsDir).forEach((file) => {
  const filePath = path.join(projectsDir, file);
  if (fs.lstatSync(filePath).isFile()) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    projectList.push({
      title: data.title,
      Img: `require("@site/static/img/${data.image}").default`,
      link: `/docs/${data.id}`,
      date: `${data.month}/${data.year}`,
      tags: data.tags,
    });
  }
});

const projectListContent = `export const ProjectList = ${JSON.stringify(
  projectList,
  null,
  2
).replace(
  /"require\(\\"@site\/static\/img\/(.*?)\\"\)\.default"/g,
  'require("@site/static/img/$1").default'
)};`;

fs.writeFileSync(outputFilePath, projectListContent);

console.log("ProjectList generated successfully.");
