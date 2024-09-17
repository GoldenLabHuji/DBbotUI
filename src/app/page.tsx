import Chat from "@/app/components/Chat";
import fs from "fs";

export default function Home() {
    // TODO: Read from the jSON file

    // DELETE THIS:
    
    // const filePath = "/tmp/db_bot.json";
    // console.log("exists", fs.existsSync(filePath as string));
    // const data = fs.readFileSync(filePath as string, "utf-8");
    // const botData = JSON.parse(JSON.stringify(data));

    //END DELETE

    return <Chat bot={JSON.parse(botData)} />;
}
