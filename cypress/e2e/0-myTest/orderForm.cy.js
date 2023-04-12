/// <reference types="cypress" />

const passingName = "bbq";
const passingSize = "checked";
const passingDough = "selected";
const passingToppings = "checked";
const initialListLenght = 4;

describe("form testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("form elemanlarının hepsi ekranda", () => {
    cy.get("input").should("have.length", 5);
    cy.get("button[type=submit]").should("be.visible");
  });

  it("hatasız giriş yapınca, pizza sipariş ediliyor", () => {
    cy.get("input[name='name']").type(passingName);
    cy.get("input[name='size']").click();
    cy.get("input[name='dough']").click();
    cy.get("input[name='toppings']").click();
    cy.get("button[type=submit]").click();
    cy.get(".form input").should("have.length", initialListLenght + 1);
  });

  it("sadece isim boşken form gönderilmiyor, hata mesajı görünüyor", () => {
    cy.get("input[name='name']").type("pizzaAdı");
    cy.get("input[name='name']").clear();
    cy.get("input[name='size']").click();
    cy.get("input[name='dough']").click();
    cy.get("input[name='toppings']").click();
    cy.get("input[name='name']+span").should("be.visible");
    cy.get("input[name='name']+span").should("have.text", "pizzaAdı zorunlu");
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("Pizza boyutu seçilmezse form gönderilmiyor, hata mesajı görünüyor", () => {
    cy.get("input[name='name']").type(passingName);
    cy.get("input[name='size']").click();
    cy.get("input[name='dough']").click();
    cy.get("input[name='toppings']").click();
    cy.get("input[name='size']+span").should("be.visible");
    cy.get("input[name='size']+span").should(
      "have.checked",
      "pizza boyutu seçilmemiş olabilir mi?"
    );
    cy.get("button[type=submit]").should("be.disabled");
    cy.get("input[name='size']").clear();
    cy.get("input[name='size']").click();
    cy.get("button[type=submit]").should("not.be.disabled");
    cy.get("input[name='size']+span").should("not.exist");
  });

  it("Pizza hamuru seçilmezse form gönderilmiyor, hata mesajı görünüyor", () => {
    cy.get("input[name='name']").type(passingName);
    cy.get("input[name='size']").click();
    cy.get("input[name='dough']").click();
    cy.get("input[name='toppings']").click();
    cy.get("input[name='dough']+span").should("be.visible");
    cy.get("input[name='dough']+span").should(
      "have.selected",
      "pizza hamuru seçilmemiş olabilir mi?"
    );
    cy.get("button[type=submit]").should("be.disabled");
    cy.get("input[name='dough']").clear();
    cy.get("input[name='dough']").click();
    cy.get("button[type=submit]").should("not.be.disabled");
    cy.get("input[name='dough']+span").should("not.exist");
  });

  it("malzeme seçili değil iken form gönderilemiyor, hata mesajı görünüyor", () => {
    cy.get("input[name='name']").type(passingName);
    cy.get("input[name='size']").click();
    cy.get("input[name='dough']").click();

    cy.get("[data-cy='errorTopping']").should("not.exist");
    cy.get("button[type=submit]").should("be.disabled");

    cy.get("input[name='topping']").click();
    cy.get("input[name='topping']").click();

    cy.get("[data-cy='errorTopping']").should("be.visible");
    cy.get("[data-cy='errorTopping']").should(
      "have.checked",
      "en az 3 malzeme zorunlu",
      "en fazla 6 malzeme seçilebilir"
    );
    cy.get("button[type=submit]").should("be.disabled");
  });
});
