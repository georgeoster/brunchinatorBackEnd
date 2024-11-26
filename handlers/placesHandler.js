const { 
	getPlaceByPlaceId,
	addPlace,
} = require('../databaseAccess/placesDatabaseAccess');
const { BadSchemaResponse } = require('../errors/BadSchemaResponse');
const { DBErrorResponse } = require('../errors/DBErrorResponse');
const { PLACE_ID_SCHEMA, VALIDATE_CREATE_PLACE_SCHEMA } = require('../schemas/placesSchemas');
const { validateBySchema } = require('../utils/utils');

class PlacesHandler {

	/**
	 * finds place that matches placeId
	 * 
	 * returns {
	 * 	success: boolean
	*   placeExists: boolean,
	*   place: PLACE || null
   * }
	 * 
	 * @param {string} placeId 
	 * @returns {object}
	 */
	async getPlaceByPlaceId(placeId) {
		const placeIdIsValid = validateBySchema(placeId, PLACE_ID_SCHEMA);
		if (!placeIdIsValid.isValid) {
			return new BadSchemaResponse(400, placeIdIsValid.error.message);
		}

		const response = await getPlaceByPlaceId(placeId);

		if (response.DBError) {
			return new DBErrorResponse(response.DBError);
		}

		return {
			success: true,
			placeExists: response.success,
			place: response.place,
		}
	}

	/**
	 * addes place
	 * 
	 * returns {
	 * 	sucess: boolean
	 * }
	 * 
	 * @param {object} place 
	 * @returns {object[]}
	 */
	async addPlace(place) {
		const placeIsValid = validateBySchema(place, VALIDATE_CREATE_PLACE_SCHEMA);

		if (!placeIsValid.isValid) {
			return new BadSchemaResponse(400, placeIsValid.error.message);
		}

		const response = await addPlace(place);
		
		if (response.DBError) {
			return new DBErrorResponse(response.DBError);		}

		return {
			success: true
		};
	}
}

module.exports = PlacesHandler;
