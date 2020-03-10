export enum MailpieceFace {
    TOP, LEFT, RIGHT, FRONT, BACK, BOTTOM
}

export enum MailpieceType {
    UNKNOWN, LETTER, LETTER_BUNDLE, FLAT, FLAT_BUNDLE, PARCEL
}

export interface SubmitMailpiece {

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
     * The MailpieceAttrT type is assigned to the element mp_attr. It provides basic
     * mailpiece related information:
     * 
     * - the kind of the mail item
     * - the mailclass of the mail item; important for the ED because it and may affect the address recognition
     * - the scanned faces of the mail item. The FaceSetT type is assigned to faces and allows providing a sequence of faces. 
     *   The FaceSetT types allows to link a face with the corresponding image by a page attribute.
     * - a preknowledge result if a barcode reader or some other type of Enrichment Device is directly attached to the MC.
     *   This result will be in accordance with the result type specified in the IC-ED interface.
     * 
     */
    mpAttr?: MailpieceAttr;    
}

/**
 * To specify a region location, the region descriptor LocationT listed subsequently is used. LocationT encloses
 * no information about the image orientation. The image orientation is specified in the TIFF header. Region
 * coordinates are given in pixel and are related to the image origin which corresponds to the upper left corner.
 * The coordinates are independent of the TIFF orientation.
 */
export interface Location {
    /**
     * # GER-TODO
     * Zur Erkennung auf welcher Seite (welche Kamera) der Identcode gelesen wurde (z.B. für VCS…).
     * Der Wert ist nur auf den Identcode (national) bezogen.
     */
    face?: MailpieceFace;
    
    /**
     * Achtung: Die Punkte in Förderrichtung durchnummeriert, im Unterschied zum CEN-Standard, wo sie im (Gegen-)Uhrzeigersinn ausgerichtet sind.
     * Die Punkte werden wie folgt ermittelt/ausgegeben:
     * erster Punkt in Förde-richtung ist der Start-punkt gezählt wird fortlaufend in Förderichtung (nicht Uhrzeigersinn) 
     * alle Angaben sind bezogen auf den Triggernullpunkt (= Schalenanfang) ‚x’ wird in Förderrichtung ermittelt; ‚y’ quer zur Förderrichtung
     */
    polygon?: Polygon;
}

export interface Polygon {
    dot: PolygonDot[];
}

export interface PolygonDot {
    x: number;
    y: number;
}

/**
 * This type is taken from CEN/TS 15448 and extended by a “preknowledge” element.
 * The type MailpieceAttrT specifies basic mailpiece attributes.
 */
export interface MailpieceAttr {
    /**
     * Defines the type of the mail item.
     * 
     * Will be hardcoded to 'parcel'.
     */
    type: MailpieceType; 

    /**
     * Provides preknowledge to the RC System, e.g. a barcode
     * result if a barcode reader is integrated into the machine.
     * 
     */
    preknowledge?: RecognitionResult;
}

export interface RecognitionResult {
    /**
     * If true, multiple identcodes were recognized by the camera.
     */
    multipleMailpiecdIdRecognized?: boolean;

    /**
     * [extension]
     * 
     * # Code 128
     * a) Internationaler Barcode
     *    Beispiel: EP923689367CH
     *    Validierung: [A-Z]{2}[0-9]{9}[A-Z]{2} (13 Zeichen)
     * b) Nationaler Barcode
     *    Beispiel: 994214393000008666
     *    Validierung: (98|99)[0-9]{16} (18 Zeichen)
     * c) Produktcode: PRZL (Produkt/Zusatzleistungen)
     *    Beispiel: 0509
     *    Validierung: [0-9]{4} (4 Zeichen)
     * d) BoxId
     *    Erste zwei Ziffern: Typ der Bod: «45» für ThermoCare-Box, Letzte sechs Ziffern: Seriennummer der Box
     *    Beispiel: 45093456
     *    Validierung: [0-9]{8} (8 Zeichen)
     * e) Förderhilfentyp
     *    Format: Erste zwei Ziffern: Typ der Förderhilfe, Letzte vier Ziffern: Gewicht der Förderhilfe in Gramm
     *    Beispiel: 020450
     *    Validierung: [0-9]{6} (6 Zeichen)
     * 
     * # DataMatrix 
     * Datenfeld: Data Matrix 
     * - Validierung: ECC200
     *   Beispiel: 756109025843770000010000000000000000000003489510005501606300
     *   Validierung: ECC200 (Max. 90 Zeichen)
     * 
     */
    barCodes?: BarCode[];

    location?: Location;
    
    /**
     * [extension]
     * 
     * Parcel dimension.
     */
    dimension?: Dimension;

    /**
     * [extension]
     * 
     * Parcel weight.
     */
    weight?: Weight;
    /**
     * [extension]
     * 
     * Legal For Trade information.
     */
    legalForTrade?: LegalForTrade;

    binOccupancy?: BinOccupancyState;
}

/**
 * Provides the valid symbologies of a barcode label
 */
export enum BarCodeSymbology {
    CODE_128, DATA_MATRIX
}
export enum BarCodeStatus {
    NO_BARCODE, DETECTED_AND_RECOGNIZED, DETECTED_AND_NOT_RECOGNIZED
}

/**
 * This type contains a barcode.
 */
export interface BarCode {
    type?: BarCodeSymbology; // Provides the valid symbologies of a barcode label.
    value?: string; // This element contains the value of the barcode.
    status: BarCodeStatus; // This element contains the status of the barcode.
}

/**
 * Parcel dimensions
 */
export interface Dimension {
    /**
     * Length in [mm].
     * 
     * @type integer
     */
    length?: number;

    /**
     * Width in [mm].
     * 
     * @type integer
     */
    width?: number;

    /**
     * Height in [mm].
     *
     * @type integer
     */
    height?: number;

    state?: DimensionMeasurementState;
}

/**
 * State of the measurement.
 */
export interface DimensionMeasurementState {
    measurementResult: DimensionMeasurementResultType;
    measurementRange: DimensionMeasurementRangeType;
    itemSizeClassification: ItemSizeClassificationType;
}

/**
 * Measurement result state.
 * 
 * - OK: Measurement VMS ok
 * - NOK: Measurement VMS not ok
 * - NOT_RECOGNIZED: No object recognized
 */
export enum DimensionMeasurementResultType {
    OK, NOK, NOT_RECOGNIZED
}

/**
 * - INSIDE: Object is within the measurement range
 * - OUTSIDE: Object is outside of the measurement range
 */
export enum DimensionMeasurementRangeType {
    INSIDE, OUTSIDE
}

export interface ItemSizeClassificationType {
    /**
     * True: object size ok
     * False: Object size not ok (over and/or undersized, see corresponding flags)
     */
    ok: boolean;

    /**
     * object too big to be measured
     */
    oversized: boolean;

    /**
     * object too small to be measured
     */
    undersized: boolean;
}

/**
 * Weight information with a corresponding status.
 */
export interface Weight {
    /**
     * Actual weight in [g].
     * 
     * @type integer
     * @maxLength 6
     */
    value?: number;

    state?: WeightMeasurementState;
}

export interface WeightMeasurementState {
    /**
     * False: Weight is not legal for trade.
     */
    isLegalForTrade: boolean;

    packageDistanceError: boolean;
    packageLengthError: boolean;
    externalError: boolean;

    invalidMeasurement: boolean;

    /**
     * Weight higher than max. weight.
     */
    overweight: boolean;

    /**
     * Weight lower than min weight.
     */
    underweight: boolean;

    overload: boolean;
    underload: boolean;

    conveyorSpeedChangedDuringMeasurement: boolean;
    conveyorSpeedOutOfMaxLimit: boolean;
    alibiStorageAtScaleFailed: boolean;

    scaleDataFormatError: boolean;
}

/**
 * Customs information
 */
export interface LegalForTrade {
    /**
     * # GER-TODO
     * 
     * Realvolumen VMS#1 wenn VMS#1 = VMS420/520 Realvolumen = 000000 bei VMS#1 = VMS410/510
     * [dm3]
     * 
     * @type integer
     * @maxLength 5
     */
    actualVolume?: number;

    /**
     * Boxvolumen = Länge x Breite x Höhe
     * [dm3]
     * 
     * @type integer
     * @maxLength 5
     */
    boxVolume?: number;

    /**
     * Realvolumen / Boxvolumen in % ganzzahlig
     * 
     * @type integer
     */
    volumeRatio?: number;

    /**
     * Die Paketform.
     */
    shape?: ShapeType;

    state?: LegalForTradeState;    
}

/**
 * Detailed information on legal for trade relevant measurements.
 * 
 * - If all flags are false, the measurements are legal for trade.
 * - If only weightError is true, dimension measurement is legal for trade.
 * - If only dimensionError is true, weight measurement is legal for trade.
 * - Otherwise, measurements are not legal for trade.
 */
export interface LegalForTradeState {
    /**
     * Conveyor speed is out of tolerance.
     */
    conveyorSpeedError: boolean;

    /**
     * Alibi storage error.
     */
    storageError: boolean;

    /**
     * VMS data is not legal for trade.
     */
    dimensionError: boolean;

    /**
     * Weight data not legal for trade.
     */
    weightError: boolean;
}

export enum ShapeType {
    CUBIC, IRREGULAR
}

/**
 * Doppelbelegung / Leerschalen-kontrolle
 * emptyBinOccupied: Belegte Leerschale
 * binMultipleItemOccupied: Doppelbelegung - Erkennung der Schalenbelegung von DWS
 * frontOverlappingLimitExceeded: Überstand vorne zu groß
 * backOverlappingLimitExceeded: Überstand hinten zu groß
 * multipleItemsDetected: >= 2 Objekt erkannt
 * conveyingAidDetected: Förderhilfe erkannt
 */
export interface BinOccupancyState {
    emptyBinOccupied: boolean;
    binMultipleItemOccupied: boolean;
    frontOverlappingLimitExceeded: boolean;
    backOverlappingLimitExceeded: boolean;
    multipleItemsDetected: boolean;
    conveyingAidDetected: boolean;
}