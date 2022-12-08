import { near, log, json, JSONValueKind } from "@graphprotocol/graph-ts";
import { Stream } from "../generated/schema";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;

  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i],
      receipt.receipt,
      receipt.block.header,
      receipt.outcome
    );
  }
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }

  const functionCall = action.toFunctionCall();

  //   near tx-status Gau7eAXTL2WzrXZcPTkH42xiDifWo9eqWQFoceET4Vzd --accountId remora.testnet
  //   outcome: {
  //     executor_id: 'dev-1666544786783-45967369212094',
  //     gas_burnt: 4687252697129,
  //     logs: [
  //       'EVENT_JSON:{"event": "create native stream", "data":{\n' +
  //         '                "stream id": "8",\n' +
  //         '                "sender": "remora.testnet",\n' +
  //         '                "receiver": "0xtestuser2.testnet",\n' +
  //         '                "created time": "10000000000000000000000",\n' +
  //         '                "stream rate": "1670487652",\n' +
  //         '                "start time": "1670487720",\n' +
  //         '                "end time": "1670487840",\n' +
  //         '               "can cancel": "true",\n' +
  //         '               "can update": "false",\n' +
  //         '                "stream amount": "1200000000000000000000000",\n' +
  //         '                "Is Native" : "true"\n' +
  //         '            }'
  //     ],
  if (functionCall.methodName == "create_stream") {
    let stream = new Stream(receipt.id.toHexString());

    if (outcome.logs[0] != null) {
      stream.id = receipt.signerId; // change this later @todo
      let parsed = json.fromString(outcome.logs[0]);
      if (parsed.kind == JSONValueKind.OBJECT) {
        let entry = parsed.toObject();
        //EVENT_JSON
        let eventJSON = entry.entries[0].value.toObject();

        // data object
        let data = eventJSON.entries[0].value.toObject();

        for (let i = 0; i < data.entries.length; i++) {
          let key = data.entries[i].key.toString();
          if (key == "stream id") {
            stream.stream_id = data.entries[i].value.toBigInt();
          }
          if (key == "sender") {
            stream.sender = data.entries[i].value.toString();
          }
          if (key == "receiver") {
            stream.receiver = data.entries[i].value.toString();
          }
          if (key == "amount") {
            stream.amount = data.entries[i].value.toBigInt();
          }

        }
      }
      stream.save();
    }
  }
}
