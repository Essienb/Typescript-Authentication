import {z} from "zod";
import {NextFunction, Request, Response} from "express";

//create a schema for UserLogin - set of rules to validate
// export const loginSchema = z.object({
//     body: z.object({
//         email: z.string().email(),
//         password: z.string().min(6).max(10)})
//     });
export const registerSchema = z.object({
    body: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string().min(6).max(10),
        phone: z.string().min(10).max(14),
        roleId: z.number()})
        });

// sampleLoginSchema.safeParse({
//     email: "email@basi.com",
//     password: ""
// })

//validation path and the action of validating Data
 export default function validateSchema(schema: any){

     return (req:Request, res:Response, next:NextFunction) => {
         try{
             const result = schema.parse({
                 body:req.body,
                 params:req.params,
                 query:req.query
             })
             next();
         }
         catch(err: any){
             //use this line if you need specific error message
             // return res.status(500).json(err.issues.map((item: any) => item.message));
             return res.status(500).json(err);
         }

     }

}
