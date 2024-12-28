import { Hono } from "hono";
import { TOperationalEntries } from "../../db/types";


export const dashboard = new Hono()
dashboard.get("/",(c)=>c.json({data:"Hello dashbaord"}))

dashboard.post("/:id", async (c)=>{
    const clientId = c.req.param("id")
    const entriesData =await c.req.json() as TOperationalEntries
    //todo: init the indicators 







})


