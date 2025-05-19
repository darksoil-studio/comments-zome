use comments_integrity::*;
use hdk::prelude::*;

#[hdk_extern]
pub fn get_comments_for_commented(commented: AnyDhtHash) -> ExternResult<Vec<Link>> {
    get_links(GetLinksInputBuilder::try_new(commented, LinkTypes::CommentedToComments)?.build())
}

#[hdk_extern]
pub fn get_deleted_comments_for_commented(
    commented: AnyDhtHash,
) -> ExternResult<Vec<(SignedActionHashed, Vec<SignedActionHashed>)>> {
    let details = get_link_details(
        commented,
        LinkTypes::CommentedToComments,
        None,
        GetOptions::default(),
    )?;
    Ok(details
        .into_inner()
        .into_iter()
        .filter(|(_link, deletes)| !deletes.is_empty())
        .collect())
}
