/**
 * This type provides the requester with the ability to obtain the results of an enrichment response. The RC
 * returns the document either on request of the MC or in an unsolicited fashion.
 * The MC expects to get all defined attributes for the corresponding mailpiece from the RC System.
 **/
export interface RequestMailpieceAttributes {
    /**
     * Represents the national identifier for the mailpiece item.
     * 
     * @pattern (98|99)[0-9]{16}
     */
    mailpieceId: string;

    /**
     * [extension]
     * 
     * Timestamp of data collection.
     * 
     * @format date-time
     */
    timestamp: string;

    /**
     * Refers to a module id as event-source.  
     * @pattern [A-Z]{3}[0-9]{2}
     */
    sourceId: string;
}
