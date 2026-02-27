import express from "express"

const app = express();
const port = 3000;

const posts = [
  {
    id: 1,
    title: "Rethinking Urban Waste: Small Actions, Big Impact",
    content: "Urban sustainability does not begin with massive policy reforms — it begins with daily habits. Waste segregation at home, participation in local recycling programs, and supporting neighborhood clean-up initiatives can significantly reduce landfill pressure. When communities take ownership of their surroundings, cities become healthier, cleaner, and more resilient. Sustainable development is not just a government responsibility; it is a shared civic commitment. By encouraging informed participation, we move closer to cities that are inclusive, efficient, and environmentally responsible.",
    author: "Amaan Khan",
    category: "SDG 11 - Sustainable Cities",
    date: new Date().toLocaleDateString()
  },
  {
    id: 2,
    title: "Transparency as the Foundation of Strong Institutions",
    content: "Strong institutions are built on trust, and trust is built on transparency. When citizens have access to public data, decision-making processes, and accountability mechanisms, democratic systems become more stable and effective. Digital platforms can empower communities by making governance information accessible and understandable. Transparency does not weaken institutions — it strengthens them by encouraging responsibility and ethical leadership. Sustainable societies require not only economic growth but also institutional integrity that promotes justice and equal opportunity.",
    author: "Amaan Khan",
    category: "SDG 16 - Strong Institutions",
    date: new Date().toLocaleDateString()
  },
  {
    id: 3,
    title: "Community Participation: The Core of Sustainable Cities",
    content: "Sustainable cities are shaped not only by infrastructure but by active citizens. Community dialogue, youth involvement, and civic reporting create a culture of accountability and collaboration. When residents participate in local planning and awareness programs, urban challenges such as pollution, congestion, and safety can be addressed more effectively. Grassroots engagement ensures that development reflects the real needs of the population. Sustainable progress becomes achievable when communities are informed, connected, and empowered to contribute.",
    author: "Amaan Khan",
    category: "SDG 11 - Sustainable Cities",
    date: new Date().toLocaleDateString()
  },
  {
    id: 4,
    title: "Digital Awareness Platforms and Civic Empowerment",
    content: "Access to reliable information is a key component of institutional strength. Digital awareness platforms can bridge the gap between citizens and governance by simplifying complex policies and highlighting local initiatives. When young people engage with verified information, they become more responsible participants in civic life. Technology, when used ethically, can enhance transparency, encourage dialogue, and promote evidence-based decision making. Strong institutions are sustained not by authority alone, but by informed and engaged communities.",
    author: "Amaan Khan",
    category: "SDG 16 - Strong Institutions",
    date: new Date().toLocaleDateString()
  }
];

let nextid = posts.length + 1;




app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/" , (req , res) => {
    res.render("index.ejs" , {posts})
})

app.get("/new" , (req , res) => {
    res.render("new_post.ejs")
})

app.post("/new" , (req , res) => {
    const post = {
        id: nextid++,
        title : req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category,
        date: new Date().toLocaleDateString()
    }
    posts.push(post)
    res.redirect("/")
})

app.get("/edit/:id" , (req , res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  res.render("edit.ejs" , {post})
})

app.post("/edit/:id" , (req , res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p)=> p.id === id)

  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.body.author;

  res.redirect('/')
})

app.post("/delete/:id" , (req ,res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
  }
  res.redirect("/");
})
app.listen(port , ()=> {
    console.log(`The port is running on ${port}.`);
})