import { useEffect } from "react";
import { Container, Grid, Button } from "@mui/material";
import countries from "./data";
import classes from "../../styles/Translate.module.css";
import { theme } from "./../../Theme/AppTheme";

const Translate = () => {
  useEffect(() => {
    const fromText = document.querySelector(".from-text");
    const toText = document.querySelector(".to-text");
    const exchangeIcon = document.querySelector(".exchange");
    const selectTag = document.querySelectorAll("select");
    const Icons = document.querySelectorAll(".row i");
    const translateBtn = document.querySelector("#translateBtn");
    // language fetch
    selectTag.forEach((tag, id) => {
      for (let country_code in countries) {
        let selected =
          id === 0
            ? country_code === "en-GB"
              ? "selected"
              : ""
            : country_code === "bn-IN"
            ? "selected"
            : "";

        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
      }
    });

    // language exchange
    exchangeIcon.addEventListener("click", () => {
      let tempText = fromText.value;
      let tempLang = selectTag[0].value;
      fromText.value = toText.value;
      toText.value = tempText;
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempLang;

      fromText.addEventListener("keyup", () => {
        if (!fromText.value) {
          toText.value = "";
        }
      });
    });

    // main
    translateBtn.addEventListener("click", () => {
      console.log("==========button clicked===========");
      let text = fromText.value.trim();
      let translateFrom = selectTag[0].value;
      let translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute("placeholder", "Translating...");

      let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
          toText.value = data.responseData.translatedText;
        });
      toText.setAttribute("placeholder", "Translation");
    });

    Icons.forEach((icon) => {
      icon.addEventListener("click", ({ target }) => {
        if (!fromText.value || !toText.value) return;
        if (target.classList.contains("fa-copy")) {
          if (target.id === "from") {
            navigator.clipboard.writeText(fromText.value);
          } else {
            navigator.clipboard.writeText(toText.value);
          }
        } else {
          let utterance;
          if (target.id === "from") {
            utterance = new SpeechSynthesisUtterance(fromText.value);
          } else {
            utterance = new SpeechSynthesisUtterance(toText.value);
          }
          speechSynthesis.speak(utterance);
        }
      });
    });
  }, []);
  const containerStyle = {
    marginTop: "16px",
  };
  return (
    <Container style={containerStyle} className="min-h-screen">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.container}>
            <div className={classes.wrapper}>
              <div className={classes.textInput}>
                <textarea
                  spellCheck="false"
                  placeholder="Enter Text"
                  className="from-text"
                ></textarea>
                <textarea
                  readOnly
                  spellCheck="false"
                  placeholder="Translation"
                  className={`${classes.toText} to-text`}
                ></textarea>
              </div>
              <ul className={`${classes.controls} controls`}>
                <li className={`${classes.row} ${classes.from} row from`}>
                  <div className={`${classes.icons} icons`}>
                    <i id="from" className="fas fa-volume-up" />
                    <i id="from" className="fas fa-copy" />
                  </div>
                  <select></select>
                </li>
                <li className="exchange">
                  <i className="fas fa-exchange-alt" />
                </li>
                <li className={`${classes.row} ${classes.to} row to`}>
                  <select></select>
                  <div className={`${classes.icons} icons`}>
                    <i id="to" className="fas fa-volume-up" />
                    <i id="to" className="fas fa-copy" />
                  </div>
                </li>
              </ul>
            </div>
            <Grid item xs={12}>
              <Button
                id="translateBtn"
                style={{
                  color: "white",
                  backgroundColor: `${theme.buttonColor}`,
                  width: "100%",
                }}
              >
                Translate
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Translate;
