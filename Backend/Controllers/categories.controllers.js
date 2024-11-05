import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

//create a new category
export const createNewCategory = async(req, res) => {
    const { name, description } = req.body
    try{
        const newCategory = await prisma.category.create({
            data : {
                name : name,
                description : description
            }
        })
        res.status(201).json({ success : true, message : "Record Created Successfully", data : newCategory})
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message || "Error creating Category"
        })
    }
}

//create many categories at once
export const createCategories = async(req, res) => {
    try{
        const categoriesCreated = await prisma.category.createMany({
            data :  [
                {
                  name: "Software Development",
                  description: "Topics related to programming languages, frameworks, and best practices in software development."
                },
                {
                  name: "Artificial Intelligence & Machine Learning",
                  description: "Exploration of AI technologies, machine learning algorithms, and data science."
                },
                {
                  name: "Cybersecurity",
                  description: "Insights into network security, ethical hacking, and protecting digital information."
                },
                {
                  name: "Web Development",
                  description: "Discussions on frontend and backend web technologies, including design and performance."
                },
                {
                  name: "Cloud Computing",
                  description: "Information about cloud providers, DevOps practices, and serverless architecture."
                },
                {
                  name: "Data Science & Big Data",
                  description: "Analysis techniques, data engineering, and tools for managing large datasets."
                },
                {
                  name: "Blockchain & Cryptocurrency",
                  description: "Understanding blockchain technology, cryptocurrencies, and decentralized finance."
                },
                {
                  name: "Mobile Development",
                  description: "Topics surrounding iOS and Android app development, including design and monetization."
                },
                {
                  name: "Gadgets & Hardware",
                  description: "Reviews and discussions about consumer electronics, IoT devices, and DIY hardware projects."
                },
                {
                  name: "Programming Languages",
                  description: "Insights into various programming languages and their use cases, including new and emerging languages."
                },
                {
                  name: "Tech News & Trends",
                  description: "Current events and trends shaping the tech industry, including emerging technologies."
                },
                {
                  name: "Game Development",
                  description: "Exploration of game design, development tools, and the gaming industry."
                },
                {
                  name: "DevOps & Automation",
                  description: "Practices around continuous integration and deployment, automation tools, and site reliability engineering."
                },
                {
                  name: "Tech Careers & Industry Insights",
                  description: "Advice on tech careers, job hunting, and insights into the tech industry's culture."
                },
                {
                  name: "Ethics & Tech Impact on Society",
                  description: "Discussion on the ethical implications of technology and its impact on society."
                }
              ] 
        })
        res.status(201).json({
            success : true,
            message : "Records Created Successfully",
            categories :  categoriesCreated
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
} 

//get all categories
export const getAllCategories = async(req, res) => {
    try{
        const allCategories = await prisma.category.findMany()
        res.status(200).json({
            success : true,
            data : allCategories
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message || "Error Fetching Categories"
        })
    }
}