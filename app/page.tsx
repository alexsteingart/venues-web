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
  console.log(selectItemsResponse.Items[22])

  return (
    <div className="h-screen">
      <VenuesMap
          gapi_key={process.env.GAPI_KEY}
          gmap_id={process.env.GMAP_ID}
          venues={selectItemsResponse.Items || []}
      />
    </div>
  );
}
