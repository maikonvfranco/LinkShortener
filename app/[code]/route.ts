import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request, { params }: { params: Promise<{ code: string }>} //Receive the params from url
){
    const {code} = await params; //saves the code from params

    try{
        const link =  await prisma.link.findUnique({ //Find in bd the correspondent code
        where: {code}
    });
        if(!link){ // return 404 in case failed
           return Response.json({ error: "Link not found" }, { status: 404 })
        }
        await prisma.link.update({ // update the clicks counter
            where: { code },
            data: { clicks: { increment: 1}}
        })
        return Response.redirect(link.originalUrl, 307) // redirect to original link
    }catch{
        return Response.json({ error: "Not possible to find this link" }, { status: 500 });
    }
}