import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ExecuteStatementCommand,
} from "@aws-sdk/lib-dynamodb";
import VenuesMap from '@/app/ui/map/venues-map';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export default async function Home() {

  const selectItemsStatementCommand = new ExecuteStatementCommand({
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.select.html
    Statement: 'SELECT * FROM venues'
  });
  const selectItemsResponse = await docClient.send(selectItemsStatementCommand);
  console.log(`Got item(s): ${JSON.stringify(selectItemsResponse.Items[0])}`);


  return (
    <div className="h-screen">
      <VenuesMap/>
    </div>
  );
}
