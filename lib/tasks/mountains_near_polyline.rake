task :mountains_near_polyline => :environment do
  polyline = 'i`jiFvmngSiBMwAbA_AhAENNFz@m@v@EdA\\DRCTi@v@gBxAs@fCo@t@wDtH}AfBcAd@w@pAcCjAk@x@m@Ru@l@eAf@{B@}Ak@gAeBg@SoDr@w@`@aE~@g@^iAB{ClAy@r@mBv@sB|A}Bh@qCrD_@PeCVg@Ie@W}ANyCb@}AAuB[_@HYw@oA_AgDSo@]_BQoBi@wAMk@WkBmAs@w@qA]_CkB_CgAsBcBcBkBm@[_BHwBQcDj@gGvBaBYmBjAu@Is@p@m@\\cBVqBAg@Rk@@}Ch@cBv@iEjAaAp@Go@FyAOa@oAq@qASoAs@Ga@NmEj@{@d@GXUR_@Nw@BqAK{@JyBn@aEBm@Ng@G_@k@C}Ed@m@Oe@Fg@RoAJqBdAaAAw@PeDKoFw@eBm@mDuAgBeBm@Hy@Is@e@w@s@k@Q]]s@e@s@U{AyAYGi@iAc@]Mk@q@k@Eg@M[gAX_@E{BTe@|@{@UoCTmAEaAYGU_@QY?]_@u@a@i@u@WAiBgAIg@o@y@Q?[_@_Ai@_@CKY]EkAgAcAmAcCu@kBuBgBgE`AnCzAzBhBrA^l@X@\\^NE|@r@~@^\\~@t@Bb@~@`@NN\\X^RH@Tp@El@LVVb@`Av@p@^LHSLBfBhAj@NlC@j@MjB^^{@`DGZQV@`@d@D\\VN^vA^Ld@n@\\L|@fAjA`@l@d@P`@hCrArBxA`@?RLvAN^ThCl@~B`AdGr@bCBrASZY|@Y`Ci@v@CbAPXQzDSZ|@{@jG?n@Md@N`BCp@]vAi@j@c@Je@p@DdAO|BNd@jAr@bAPxAp@Pf@ElAFl@z@i@~AY|Aw@hCy@z@C|Cs@lBD~A[n@W~@w@xAE~@}@|@^\\BfBa@jFkB`BU|BJjACv@VrEfErAf@nCxBzB~@jBzAhAh@nHvA|@^vCRnAt@Zt@`D\\xA?xAKr@]zAQjA`@x@@`B]`B}A|@sAtBo@jK}FpBSp@]~@IjFmBdBWf@Dl@VbAvAnAXhC@xAw@xA_Ab@s@fAo@~@Yl@eAfAa@~AeBpBuEvBoDj@sBtAgAv@mAGa@y@Wo@AeAf@MID[nCaCVCh@L~@I'
  locations = Locations::CreateService.decode(polyline: polyline)

  mountains = locations.map do |location|
    # To radians, for now
    lat = location[:lat] * (Math::PI / 180)
    lng = location[:lng] * (Math::PI / 180)

    UserMountains::CreateService.mountains_within(lat: lat, lng: lng)
  end
  .compact
  .flatten
  .uniq

  pp mountains.map(&:name)
end