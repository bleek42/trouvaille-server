exports.isValidWaypointReq = (origin, destination) => {
  const usStateRegex =
    /((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/i;
  const isUsState =
    (typeof origin === 'string' && usStateRegex.test(origin)) ||
    (typeof destination === 'string' && usStateRegex.test(destination));

  const isGooglePlaceId =
    (typeof origin === 'string' && origin.startsWith('place_id:')) ||
    (typeof destination === 'string' && destination?.startsWith('place_id:'));

  const isLatLng =
    !isNaN(origin?.lat && origin?.lng) ||
    !isNaN(destination?.lat && destination?.lng);

  return isGooglePlaceId || isLatLng || isUsState ? true : false;
};
// const origLatLng = { lat: 45.45445165, lng: -74.456546 };
// const destLatLng = { lat: 14.8258442, lng: -65.465214 };
// const origState = 'Ann Arbor, mi';
// const destState = 'Manahawkin, nj';
// const origId = 'place_id:sdfn545-nrfsn545121';
// const destId = 'place_id:ad76515dj-fkmc55124';

// console.log(isValidWaypointReq(origState, destLatLng));
