/**
 * This type contains the result for a mail piece that has been determined by the RC System.
 **/
export interface TransmitMailpieceAttributes {
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

    addressResult?: AddressResult;
}

export interface AddressResult {
    /**
     * The destination sort code is the outlet group name (Virtuelles Ziel) assigned to the mail piece.
     * Specific values are defined on a per-program basis.
     * 
     * @type integer
     * @maxLength 3
     */
    code: number;

    /**
     * This string element contains a reason why the RC System was unable to determine a result.
     * The sorting machine needs to recognize and count the reject reason in order to
     * a) stop the induction when the reject reason occured max. times in a row
     * b) generate live-data / statistics
     */
    rejectReasons?: string[];
}