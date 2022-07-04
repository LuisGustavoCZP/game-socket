import { ExceptionTreatment } from "../../utils";
import { sessionConfig } from "../../config";
import Database from "../../database";
import { APIResponse, Session } from "../../models";

async function get (userId : string) : Promise<APIResponse>
{
    try 
    {
        const respSession = await Database.select("sessions", { user:userId }) as Session[];
        if(respSession.length > 0) 
        {
            const session = respSession[0];

            const creation = new Date(session.createdAt);
            const expiration = creation.getTime() + sessionConfig.expiration;
            const leftTime = Date.now() - expiration;
            console.log(leftTime);
            if(leftTime > 0)
            {
                await Database.remove("sessions", session.id);
            }
            else
            {
                return {
                    data: session.id,
                    messages: []
                } as APIResponse;
            }
        }

        return {
            data: null,
            messages: []
        } as APIResponse;
    }
    catch (e)
    {
        throw new ExceptionTreatment(
            e as Error,
            500,
            "an error occurred while inserting user on database"
        );
    }
}

export default get;