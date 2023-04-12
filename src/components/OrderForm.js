import "./OrderForm.css";
import CounterButton from "./CounterButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";

const emptyPizza = {
  name: "",
  size: null,
  dough: "",
  toppings: [],
  special: "",
};

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("İsim alanı zorunludur")
    .min(3, "İsim en az 3 karakter olmalı"),
  size: Yup.string()
    .oneOf(["kucuk", "orta", "buyuk"], "")
    .required(),
  dough: Yup.string()
    .oneOf([1, 2, 3, 4, 5, 6, 7] /*0, ""*/)
    .required(),
  //   size: Yup.string()
  //     .size("boyut alanında bir hata olabilir mi?")
  //     .required("eposta zorunlu"),
  //   dough: Yup.string()
  //     .min(6, "şifre en az 6 hane olmalı")
  //     .required("şifre zorunlu"),
  toppings: Yup.array()
    .min(3, "en az 3 malzeme seçin")
    .max(6, "en çok 6 malzeme seçin"),
});

function OrderForm(props) {
  const [formData, setFormData] = useState(emptyPizza);
  //const [isEditing, setisEditing] = useState(false);
  const [toppings, settoppings] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    size: "",
    dough: "",
    toppings: "",
    special: "",
  });

  //   useEffect(() => {
  //     console.log("new pizza");
  //     props.editMode ? setFormData(props.editMode) : setFormData(emptyPizza);
  //     props.editMode ? setisEditing(true) : setisEditing(false);
  //   }, [props.editMode]);

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setIsButtonDisabled(!valid));
  }, [formData]);

  const handleReset = () => {
    setFormData(emptyPizza);
    setErrors({
      name: "",
      size: "",
      dough: "",
      toppings: "",
      special: "",
    });
  };

  const checkFormErrors = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };

  const handleChange = (event) => {
    const { value, type, name } = event.target;
    console.log(value);

    if (type === "checkbox") {
      let newToppings;
      if (formData.toppings.includes(value)) {
        // zaten işaretli, arrayden çıkar
        newToppings = formData.toppings.filter((topping) => topping !== value);
      } else {
        //  işaretli değil, arraye ekle
        newToppings = [...formData.toppings, value];
      }
      checkFormErrors(name, newToppings); // YUP
      setFormData({
        ...formData,
        [name]: newToppings,
      });
    } else {
      checkFormErrors(name, value); // YUP
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addPizza(formData);
    //setisEditing(false);
    setFormData(emptyPizza);

    const postData = {
      name: formData.name,
      size: formData.size,
      dough: formData.dough,
      toppings: formData.toppings,
      special: formData.special,
    };

    axios
      .post("https://reqres.in/api/orders", postData)
      .then((response) =>
        console.log("Siparişiniz başarıyla gönderildi:", response.data)
      )
      .catch((error) =>
        console.error("Sipariş gönderilirken bir sorun oluştu:", error)
      );
  };

  console.log("toppings:", toppings);

  return (
    <div className="form">
      {/*isEditing <h2>Üye Düzenle</h2> :*/ <h2>Pizzanı Oluştur</h2>}
      <form onSubmit={handleSubmit} className="form-line">
        <div className="name">
          <h4 htmlFor="name">Pizza Adı:</h4>
          <input
            placeholder="Örn: Position Absolute Acı Pizza"
            type="text"
            name="name"
            value={formData.name}
            onChange={(event) => handleChange(event)}
          />
          {errors.name !== "" && (
            <div className="field-error">
              <span>{errors.name}</span>
            </div>
          )}
        </div>
        <div className="size-dough">
          <div className="size">
            <h4 htmlFor="size">Pizza Boyutu:</h4>
            <label>
              <input
                onChange={handleChange}
                value="small"
                type="radio"
                name="size"
                checked={formData.size === "small" || false}
              />
              Küçük
            </label>
            <label>
              <input
                onChange={handleChange}
                value="medium"
                type="radio"
                name="size"
                checked={formData.size === "medium" || false}
              />{" "}
              Orta
            </label>
            <label>
              <input
                onChange={handleChange}
                value="huge"
                type="radio"
                name="size"
                checked={formData.size === "huge" || false}
              />{" "}
              Büyük
            </label>
            {errors.size !== "" && (
              <div className="field-error">{errors.size}</div>
            )}
          </div>
          <div className="dough">
            <h4 htmlFor="dough">
              Pizza Hamuru:
              {/* <input
            type="text"
            name="dough"
            value={formData.dough}
            onChange={(event) => handleChange(event)}
          /> */}{" "}
            </h4>
            <select>
              <option value="0">Hamur Seç</option>
              <option value="1">İnce Hamur</option>
              <option value="2">Normal Hamur</option>
              <option value="3">Ekşi Mayalı</option>
              <option value="4">Siyez Unlu</option>
              <option value="5">Cevizli</option>
              <option value="6">Zeytinyağlu</option>
              <option value="7">Çövenotlu</option>
            </select>
            {errors.dough !== "" && (
              <div className="field-error">
                <span>{errors.dough}</span>
              </div>
            )}
          </div>
        </div>
        <div className="checkBox">
          <h4>Malzemeler:</h4>
          <div className="checkBox-container">
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Misir"
                onChange={handleChange}
                checked={formData.toppings.includes("Misir")}
              />
              Mısır
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Jambon"
                onChange={handleChange}
                checked={formData.toppings.includes("Jambon")}
              />
              Jambon
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Parmesan"
                onChange={handleChange}
                checked={formData.toppings.includes("Parmesan")}
              />
              Parmesan
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Sucuk"
                onChange={handleChange}
                checked={formData.toppings.includes("Sucuk")}
              />
              Sucuk
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Sogan"
                onChange={handleChange}
                checked={formData.toppings.includes("Sogan")}
              />
              Soğan
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Feslegen"
                onChange={handleChange}
                checked={formData.toppings.includes("Feslegen")}
              />
              Fesleğen
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Tarator"
                onChange={handleChange}
                checked={formData.toppings.includes("Tarator")}
              />
              Tarator
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Carpaccio"
                onChange={handleChange}
                checked={formData.toppings.includes("Carpaccio")}
              />
              Carpaccio
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Roclette"
                onChange={handleChange}
                checked={formData.toppings.includes("Roclette")}
              />
              Roclette
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Kekik"
                onChange={handleChange}
                checked={formData.toppings.includes("Kekik")}
              />
              Kekik
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Mantar"
                onChange={handleChange}
                checked={formData.toppings.includes("Mantar")}
              />
              Mantar
            </label>
            <label htmlFor="toppings">
              <input
                type="checkbox"
                name="toppings"
                value="Bacon"
                onChange={handleChange}
                checked={formData.toppings.includes("Bacon")}
              />
              Bacon
            </label>
          </div>
          <div>
            {errors.toppings !== "" && (
              <div className="field-error">
                <span data-cy="errorTopping">{errors.toppings}</span>
              </div>
            )}
          </div>
        </div>
        <div className="special">
          <label htmlFor="special">
            <h4>Sipariş Notu:</h4>
            <textarea
              placeholder="Siparişinize eklemek istediğiniz bir not mar mı?"
              className="special-note"
              rows="4"
              cols="50"
            ></textarea>
          </label>
        </div>
        <button type="reset" onClick={handleReset}>
          Formu temizle
        </button>
        <hr></hr>
        <div className="lastSin">
          <div className="counterButton">
            <CounterButton />
          </div>
          <div className="conclusion">
            <h3>Sipariş Toplamı</h3>
            <h5 className="choice">Seçimler</h5>
            <h5 className="total">Toplam</h5>
            <button
              className="submit-button"
              type="submit"
              disabled={isButtonDisabled}
            >
              {"Pizzanı Onayla"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
