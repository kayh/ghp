/**
 * # GER-TODO
 * 
 * Der Dienst ermöglicht der MC, aktualisierte oder zusätzliche Informationen in Bezug auf eine Postsendung zu übertragen, 
 * die dem RC- System bereits vorgelegt worden ist. Solange sich die Postsendung zur Verarbeitung in der Maschine befindet, kann dieser 
 * Dienst von der MC mehrfach ausgeführt werden.
 * Für einen Sortierablauf ohne das Einscannen von Bildern (z.B.stationäre Bearbeitung im Zielfrachtzentrum oder Sortierung in der 
 * Reihenfolge der Zustellung) kann mit diesem Dienst die Behälternummer zur Verfügung gestellt werden, in den die 
 * Postsendung physikalisch einsortiert wird; für diesen Fall muss kein submitMailpiece ausgeführt werden. 
 **/
export interface UpdateMailpieceAttributes {
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

    /**
     * Weight of the mail piece in [g].
     * 
     * @type integer
     * @maxLength 6
     */
    weight?: number;

    /**
     * The name of the outlet to which the machine physically sorted the mail piece.
     * The outlet name is a 4 digit number.
     * 
     * @type integer
     * @maxLength 4
     */
    sortBin: number;

    /**
     * The destination sort code is the outlet group name (Virtuelles Ziel) assigned to the mail piece.
     * Specific values are defined on a per-program basis.
     * 
     * @type integer
     * @maxLength 3
     */
    code?: number;

    /**
     * A boolean value indicating whether or not processing for a mail piece is complete.
     * 
     * - false: mail piece was discharged
     * - true: Discharging was verified
     */
    finalCoded: boolean;

    sortReason?: SortReason;
}

/**
 * Defines the machine specific sort reasons.
 * List of values:
 * - UNKNOWN: Default enum value to map not supported values.
 * - OK: Discharge OK. This describes just a "regular" item
 * - MAX_RECIRCULATION: Item has reached the max allowed amount of recirculations.
 * - ITEM_NO_READ: Item has reached the max allowed amount of scans and the last attempt was a no read.
 * - ITEM_MULTIPLE_READ: Multiple national or international id barcodes could be identified. 
 * - SCANNER_TIMEOUT: Item has reached the max allowed amount of scans and the last attempt was a "no answer" from scanner. 
 * - ITEM_STRAY: Stray item detected. 
 * - ITEM_INDUCTION_ERROR: Induction error item detected (occupied twice, wrong tray). 
 * - ITEM_DISCHARGE_ERROR: Discharge faults. 
 * - ITEM_ERROR: Item has a Logical error. 
 * - ITEM_TRACKING_ERROR: item was inducted with tracking fault.
 * - ITEM_OCCUPIED_TWICE_ERROR: item was inducted on occupied tray.
 * - ITEM_DISAPPEARED: The parcel was lost at unknown location.
 * - OUTLET_NOT_AVAILABLE: No available chute could be found.
 * - OUTLET_UNKNOWN: Logical destination not defined.
 * - UNDEFINED_ERROR: Internal error happened.
 * - NO_CAPACITY: The destination outlet has no more capacity.
 * - DIMENSION_ERROR: Item oversize. The parcel was discharge, because of dimension exceed. 
 * - WEIGHT_ERROR: Item too heavy. The parcel was discharge, because of weight exceed.
 * - SORTPLAN_ERROR: Sortplan error. 
 * - DIRECT_SORTING_MODE: Item sorted by the direct sorting mode. 
 */
export enum SortReason {
    UNKNOWN,
    OK,
    MAX_RECIRCULATION,
    ITEM_NO_READ,
    ITEM_MULTIPLE_READ,
    SCANNER_TIMEOUT,
    ITEM_STRAY,
    ITEM_INDUCTION_ERROR,
    ITEM_DISCHARGE_ERROR,
    ITEM_ERROR,
    ITEM_TRACKING_ERROR,
    ITEM_OCCUPIED_TWICE_ERROR,
    ITEM_DISAPPEARED,
    OUTLET_NOT_AVAILABLE,
    OUTLET_UNKNOWN,
    UNDEFINED_ERROR,
    NO_CAPACITY,
    DIMENSION_ERROR,
    WEIGHT_ERROR,
    SORTPLAN_ERROR,
    DIRECT_SORTING_MODE
}