FactoryBot.define do
  factory :activity do
    user { create(:user) }
    strava_id { 4243857 }
    strava_type { 'Run' }
    strava_name { "Roxbro'in out w Knotts" }
    strava_distance { 29493.6 }
    strava_moving_time { 13308 }
    strava_elapsed_time { 13861 }
    strava_total_elevation_gain { 1105 }
    strava_start_date { '2022-05-19T14:31:07Z' }
    strava_start_date_local { '2022-05-19T08:31:07Z' }
    strava_timezone { '(GMT-07:00) America/Denver' }
    strava_map_id { 'a7170316758' }
    strava_map_summary_polyline { "a}soFl_h`Sg@jEo@pCg@~@hEU|@{AbEKzAsATs@]_CdBuBrCk@pAgC~@BvD}@|C~BpAhB^rBJjHdBvEdCcABsAzA`@DeAjBeAi@zC~DkCiA`Ea@|ClArACq@d@{Bl@y@nBd@t@{@v@f@rBaAcCfF[bKyB|B{@bJq@rBsKvEh@~BhCZv@dEw@tCl@dKkAxEwB~AqCViFrDq@gA}Bo@wCdB{DM{GxDsDEcDdBy@M@sAqCk@o@b@~@i@dCt@IpBd@bB{AEFr@oAX}BvEBpAsDn@gAk@OrEoBM}AbCkCpAkMvCqDjDcEt@_ChEQdBj@^_ApBaA}@q@wBkBt@bAtAhAzJv@bBAtCkBpDuLvLqAzCc@vE`CnDlC~AtA?tCiB`Ca@vAjBjBEb@dAWpCt@bAj@pD|DfHHtAvErHPlBlChEp@vLaAbG|@pN_@tEfApFVs@t@bAi@fCl@rFlDGvEwCnAgDtAo@fET|EvCnCyAp@z@zC{@zBdA`C{DA{A`@lBo@jCjA_C?uBhAWe@[T}@]s@rAJBvAt@jAJn@cAZrALl@w@q@cAEkFn@nAHtBhAdAq@`EqAjBhAnFDyAvBkCb@oBhDiG|CkApBsBnDoMIaGcBqAQmCcAo@g@uB`AAfC~Ab@yCWaCy@s@hFVpAg@kEcAsCuAg@mAz@aD{FWtAmDFqBlGkEPiAfBwBpCObCgApBgB~C[dAoD~BaBnA@~@mBzCuAlGKzGkFnAEjDwBbDeElAkFvA_BHiBh@Uv@cChIwF|CcAjBVnAaDnA}@Tf@g@bDhAM`BfChTlIjFDlBwCpAp@~DUfBvEzBbAv@zAeAhIa@pBbC{FfBsBn@oDuCeAaBcCm@{EgEu@mCcDwCGqFiCHs@|EkCQy@eD_BOyCzGuEk@{BaDuBoAcEsH`BmGW_CzAkEIaCnCuByA@_EgAkDkJ}@{B`DeCbBsA`EsDjAiC~BcA|F_ExCeArDErByBtBGeCPaEc@v@YuAqCMoB{CWqBw@Tt@qEgDnE[{AqI[p@sCrCyBkIkGOiCtE{EuAk@e@mAjB_KjEcFnFyKt@oE~@gBFmLkAcFwBs@eCd@aCfBz@XQb@aCnAgA}EIeGoEz@_AnBDmBrBkCd@oKbC_FyB`As@e@w@v@oBc@m@~@BrAOhAUF_AwATaDfA_EyDhCh@wCoBhAI~@_Bi@C~AyBbAeB_Fm@qKmA{@{CsDgEz@_AGyApCkCj@eBnBFdD_B|AsDHgAzAqDVOa@j@s@hAqH" }
    strava_elev_high { 2339 }
    strava_elev_low { 1811 }
  end
end