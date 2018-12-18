package no.dobrotrener.ordbok.cucumber.stepdefs;

import no.dobrotrener.ordbok.BackendApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = BackendApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
