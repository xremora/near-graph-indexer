import { near, log, json, JSONValueKind } from "@graphprotocol/graph-ts";
import { Stream } from "../generated/schema";


export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;
  
  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i], 
      receipt.receipt, 
      receipt.block.header,
      receipt.outcome,
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

  // if (functionCall.methodName == "deposit_and_stake") {
  //   const receiptId = receipt.id.toBase58()
  //   let logs = new DepositAndStake(`${receiptId}`)

  //   near tx-status Gau7eAXTL2WzrXZcPTkH42xiDifWo9eqWQFoceET4Vzd --accountId remora.testnet
  //   outcome: {
  //     executor_id: 'dev-1666544786783-45967369212094',
  //     gas_burnt: 4687252697129,

  // logs: [
    // {"event": "Native stream created", "data":{"stream id": "10","sender": "remora.testnet","receiver": "0xtestuser2.testnet","created time": "10000000000000000000000","stream rate": "1670556441","start time": "1670556480","end time": "1670556720","can cancel": "true","can update": "false","stream amount": "2400000000000000000000000","Is Native" : "true"}}
  // ],
  if (functionCall.methodName == "create_stream") {
    const receiptId = receipt.id.toBase58();

    let stream = new Stream(receiptId);

    if (outcome.logs[0] != null) {
      stream.id = receiptId; // change this later @todo



      // log parsing
      // outcome log is: {"EVENT_JSON":{"event": "Native stream created", "data":{"stream id": "14","sender": "0xtestuser2.testnet","receiver": "remora.testnet","created time": "10000000000000000000000","stream rate": "1670559571","start time": "1670559600","end time": "1670559720","can cancel": "true","can update": "false","stream amount": "1200000000000000000000000","Is Native" : "true"}}}, data_source: receipts
      log.info("outcome log is: {}", [outcome.logs[0]])
      log.info("outcome type is: {}", [typeof(outcome.logs[0])])


      let parsed = json.fromString(outcome.logs[0]);
      // log.info("outcome parsed log is: {}", [parsed.toString()]);

      if (parsed.kind == JSONValueKind.OBJECT) {
        let entry = parsed.toObject();
        
        //EVENT_JSON
        let eventJSON = entry.entries[0].value.toObject();
        log.info("a : {}", ['a']);
        // data object
        let data = eventJSON.entries[0].value.toObject();

        log.info("b :{}", ['b']);

        for (let i = 0; i < data.entries.length; i++) {
          let key = data.entries[i].key.toString();
          log.info("c :{}", ['c']);
          if (key == "stream id") {
            log.info("log inside stream id: {}", [data.entries[i].value.toString()]);
            stream.stream_id = data.entries[i].value.toString();
          }
          if (key == "sender") {
            stream.sender = data.entries[i].value.toString();
          }
          if (key == "receiver") {
            stream.receiver = data.entries[i].value.toString();
          }
          if (key == "stream amount") {
            stream.amount = data.entries[i].value.toString();
          }

        }
      }
      stream.save();
    }
  }
}