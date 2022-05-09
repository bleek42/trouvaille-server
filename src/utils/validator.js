const isValidWaypointReq = (origin, destination) => {
  const usStateRegex =
    /((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/i;
  const isUsState =
    (typeof origin === 'string' && usStateRegex.test(origin)) ||
    (typeof destination === 'string' && usStateRegex.test(destination));

  const isGooglePlaceId =
    (typeof origin === 'string' && origin.startsWith('place_id:')) ||
    (typeof destination === 'string' && destination?.startsWith('place_id:'));

  const isLatLng =
    !Number.isNaN((origin.lat && origin.lng) || (origin[0] && origin[1])) ||
    !Number.isNaN((destination.lat && destination.lng) || (destination[0] && destination[1]));
  console.log(!!isGooglePlaceId || isLatLng || isUsState);
  return !!(isGooglePlaceId || isLatLng || isUsState);
};
const origObj = { lat: 45.45445165, lng: -74.456546 };
const destObj = { lat: 14.8258442, lng: -65.465214 };
const origArr = [-12.745665, -78.114];
const destArr = [78.22154, -8.2636];
const origState = 'Ann Arbor, mi';
const destState = 'Manahawkin, nj';
const origId = 'place_id:sdfn545-nrfsn545121';
const destId = 'place_id:ad76515dj-fkmc55124';

console.log(isValidWaypointReq(origState, destArr));
module.exports = isValidWaypointReq;
