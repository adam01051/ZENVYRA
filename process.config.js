module.exports={
    apps:[{
        name:"ZENVYRA",
        cwd:"./",
        script:"./dist/server.js",
        watch:false,
        env_production:{
            NODE_ENV: "production"
        },
        env_development:{
            NODE_ENV: "development"
        },
        instances:4,
        exec_mode:"cluster"
    }]
}