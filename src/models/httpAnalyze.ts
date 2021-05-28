export interface RequestHeaders {
    [params: string]: any
}

export interface RequestPayloadBody {
   [params: string]: any
}

export interface RequestPayloadHeader {
    [params: string]: any
}

export interface RequestPayload {
    header: RequestPayloadHeader
    body: RequestPayloadBody
}
