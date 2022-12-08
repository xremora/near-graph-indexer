// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class BlockEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save BlockEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BlockEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BlockEvent", id.toString(), this);
    }
  }

  static load(id: string): BlockEvent | null {
    return changetype<BlockEvent | null>(store.get("BlockEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get number(): BigInt | null {
    let value = this.get("number");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set number(value: BigInt | null) {
    if (!value) {
      this.unset("number");
    } else {
      this.set("number", Value.fromBigInt(<BigInt>value));
    }
  }

  get hash(): Bytes | null {
    let value = this.get("hash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set hash(value: Bytes | null) {
    if (!value) {
      this.unset("hash");
    } else {
      this.set("hash", Value.fromBytes(<Bytes>value));
    }
  }

  get timestampNanosec(): BigInt | null {
    let value = this.get("timestampNanosec");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestampNanosec(value: BigInt | null) {
    if (!value) {
      this.unset("timestampNanosec");
    } else {
      this.set("timestampNanosec", Value.fromBigInt(<BigInt>value));
    }
  }

  get gasPrice(): BigInt | null {
    let value = this.get("gasPrice");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set gasPrice(value: BigInt | null) {
    if (!value) {
      this.unset("gasPrice");
    } else {
      this.set("gasPrice", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Stream extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Stream entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Stream must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Stream", id.toString(), this);
    }
  }

  static load(id: string): Stream | null {
    return changetype<Stream | null>(store.get("Stream", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get stream_id(): BigInt | null {
    let value = this.get("stream_id");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set stream_id(value: BigInt | null) {
    if (!value) {
      this.unset("stream_id");
    } else {
      this.set("stream_id", Value.fromBigInt(<BigInt>value));
    }
  }

  get sender(): string {
    let value = this.get("sender");
    return value!.toString();
  }

  set sender(value: string) {
    this.set("sender", Value.fromString(value));
  }

  get receiver(): string {
    let value = this.get("receiver");
    return value!.toString();
  }

  set receiver(value: string) {
    this.set("receiver", Value.fromString(value));
  }

  get amount(): BigInt | null {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt | null) {
    if (!value) {
      this.unset("amount");
    } else {
      this.set("amount", Value.fromBigInt(<BigInt>value));
    }
  }
}
