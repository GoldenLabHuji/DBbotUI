import Chat from "@/app/components/Chat";
import data from "@/app/data/db_bot.json";
import { createOperatorsFiles } from "@/app/general/utils";

export default function Home() {
    const botData = JSON.parse(JSON.stringify(data));

    createOperatorsFiles(botData);

    return <Chat bot={botData} />;
}
