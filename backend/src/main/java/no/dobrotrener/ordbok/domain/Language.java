package no.dobrotrener.ordbok.domain;

public enum Language {
    ENGLISH("english"),
    NORWEGIAN("norwegian");


    private final String languageName;

    /**
     * @param languageName
     */
    Language(final String languageName) {
        this.languageName = languageName;
    }

    /* (non-Javadoc)
     * @see java.lang.Enum#toString()
     */
    @Override
    public String toString() {
        return languageName;
    }
}
