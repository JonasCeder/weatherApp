import { useState } from "react";
import { SvgXml } from "react-native-svg";

export default function WeatherIcon({ symbolCode }: { symbolCode?: string }) {
  const [symbolCodeSvg, setSymbolCodeSvg] = useState("");
  fetch(`${symbolCode}.svg`)
    .then((res) => res.text())
    .then((text) => {
      if (text.startsWith("<svg")) {
        setSymbolCodeSvg(text);
      }
    })
    .catch((e) => console.error(e));

  return (
    <>
      {symbolCodeSvg && symbolCodeSvg !== "" && (
        <SvgXml xml={symbolCodeSvg} width='100%' height='100%' />
      )}
    </>
  )
}
