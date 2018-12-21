package no.dobrotrener.ordbok.domain;


@Document(indexName = "blog", type = "article")
public class NativeWord {

    @Id
    private String id;

    private String title;

    @Field(type = FieldType.Nested, includeInParent = true)
    private List<Author> authors;

    // standard getters and setters
}
