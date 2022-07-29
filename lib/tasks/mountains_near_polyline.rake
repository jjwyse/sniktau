task :mountains_near_polyline => :environment do
  polyline = 'udofFxhpoSjRsZnIkAdJcJvPmHlI{GvHqNkEd@|AeDcB|@p@{CmDbC|AeG@gUlCyBrCgKE}FnC{GL_HpHoVrIcSnFyFcAgJpLgND_AuBF^aAwAuBq@}GvFgKbAcJhBuD_AuErCyDh@_GpD_Ko@{H|@c@oAqArA}@OkGvC_EBeL~Jm@sAuGuFcHmKjCvDcKyDe@jAmBgCc@xAyAoAmA}C?{BtBa@oCgDBsJsF{Gp@aC`DkNsAzAsBgCDv@_AoNmI}KmJkA}NtCgRmByB~O|@c@}DiKaOsEaO\iEcB{G{ImMaKwEeFaEwEwGoBqKwC{A_EiJsBgMoCyEc@gOkCyBT{EsEsMk@gOqHqEqEaI~OiPvw@sK`BeDb]iYlEyIlKsI~BsG`K_HzJgPlBMrFqG`Bd@vEyFxGeRjEeOSgFzDWvBuDvAoOxG}Lb@qGfDtBdFhXtAtQbII|I|FhBmAUcFdAvAwA_IvE|FMsC~DtGlJEqBsBxHfC~MzB~Hm@tFxBhDs@`CzBhC{@`F`BjL?fAl@v@hGxCl@dDsDxEPlAtBnIeB`HtBtCvE\~F~C`B~CfDfAUdAyDo@sArAaAV}C{AkCNyAfE|@xW{EhUhFzOEnM|D|CpEbNjHrOhClGfOzUxJUmFpHfBxFyF[iXkAcGpZ`XKfG`@pGhFtL{AtCpCtCd@fFrEtFjHtHbMnGzG`JvT|JlCjFdFlAd[jUda@~InUqAnL~DlJxLhEr@~L}G~JaCrFiGjQwIaIlRSxEyLjJkBzI`E`LpEbFH|FjDfM`AfS~Irf@PhIiAzEKjSuApFi@jPnDro@gIhLkBxLcI|DuFdQXvEu@nCkB~AkIdD{FhGoLrOaChLiSzQsEzJXjM`GvMlFhG\rIwA`H`JxAzD|Fq@vF}KnMl@tEdG~LpAbLnJvLtIxBr@t@gA~BxJtErDq@jGwGbPNtUyJvEeEPxB~DnCbBxDpAtKhFlOhUlDbHZ`HrG~D`YgCrM_GzH}IvFaGhKiJjDiJ`IoUzGtAdDyAlA_@dCrAfBnLz@hA|BnIxBvTrC}AhDgE|A}I[s@tA}FvKgQbEzLzE|@v@f@rAkEjB~FjF_AR~@n@iApAbAlEKx@}@T|B|L]xA{AC~ChD_CrAnAvMoCdAs@yAqJpJ_Jz@{HgDqJJmL~D_GtGuWxh@yDlAyC{AwItBkE`G_Ct@dH@j@jA}PlEcUvZcCnGgHOvH~LgV}BrJrIBtF`DvBbUaB}OjMaAjO`Ek@zBjBaOjGiMm@wH`O|C`Gz@|XhIzKdAdL`ItOB|CzD`KpOdW|BlJjFlFjHpW|FvLvD|PlAdLeOz[~GfHDnB'
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